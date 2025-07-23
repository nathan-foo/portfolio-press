function ping_server() {
  local counter=0
  until [[ $(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000) -eq 200 ]]; do
    ((counter++))
    if (( counter % 20 == 0 )); then
      echo "Waiting for server to start..."
    fi
    sleep 0.1
  done
}

ping_server &
cd /home/user && npx next dev --turbopack