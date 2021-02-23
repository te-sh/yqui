require 'selenium-webdriver'
require 'capybara/rspec'

Capybara.configure do |config|
  config.default_driver = :chrome
  config.javascript_driver = :chrome
  config.run_server = false
end

Capybara.register_driver :chrome do |app|
  options = Selenium::WebDriver::Chrome::Options.new

  options.add_argument('--headless')
  options.add_argument('--no-sandbox')
  options.add_argument('--disable-notifications')
  options.add_argument('--disable-translate')
  options.add_argument('--disable-extensions')
  options.add_argument('--disable-infobars')
  options.add_argument('--window-size=1280,960')

  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end
