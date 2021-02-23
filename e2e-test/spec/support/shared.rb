shared_context 'global context' do
  before do
    Capybara.current_session.quit

    (YquiOperation::NUM_WINDOWS - 1).times do
      open_new_window
    end

    windows.each do |window|
      within_window(window) { visit YquiOperation::YQUI_URL }
    end
  end
end
