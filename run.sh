#!/bin/bash

# Function to check Ruby version
check_ruby_version() {
  if command -v ruby &> /dev/null; then
    ruby_version=$(ruby -v | awk '{print $2}')
    if [[ "$ruby_version" == "3.1.2" ]]; then
      echo "Ruby 3.1.2 is already installed."
      return 0
    else
      echo "Ruby version is $ruby_version. Installing Ruby 3.1.2..."
      return 1
    fi
  else
    echo "Ruby is not installed. Installing Ruby 3.1.2..."
    return 1
  fi
}

# Function to check Rails version
check_rails_version() {
  if command -v rails &> /dev/null; then
    rails_version=$(rails -v | awk '{print $2}')
    if [[ "$rails_version" == "7.0.0" ]]; then
      echo "Rails 7.0.0 is already installed."
      return 0
    else
      echo "Rails version is $rails_version. Installing Rails 7.0.0..."
      return 1
    fi
  else
    echo "Rails is not installed. Installing Rails 7.0.0..."
    return 1
  fi
}

# Install rbenv and Ruby if needed
if ! check_ruby_version; then
  curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-installer | bash
  export PATH="$HOME/.rbenv/bin:$PATH"
  eval "$(rbenv init -)"
  rbenv install 3.1.2
  rbenv global 3.1.2
fi

# Install Rails if needed
if ! check_rails_version; then
  gem install rails -v 7.0.0
fi

# Run Rails backend
echo "Running Rails backend..."
cd backend
bundle install
rails server &
cd ..


# Install Node.js and Yarn
echo "Installing Node.js and Yarn..."
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install --global yarn

# Create React frontend with Vite
echo "Running React frontend with Vite..."
cd frontend
npm install
npm run dev

echo "Setup complete!"
