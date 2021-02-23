require 'selenium-webdriver'
require 'capybara/rspec'

Capybara.configure do |config|
  config.default_driver = :chrome
  config.javascript_driver = :chrome
  config.run_server = false
end

Capybara.register_driver :chrome do |app|
  args = %w[headless no-sandbox disable-gpu window-size=1280,960]
  options = Selenium::WebDriver::Chrome::Options.new(args: args)

  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end
