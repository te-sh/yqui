shared_context 'global context' do
  before(:all) do
    Capybara.session_name = :s0
  end

  before do
    Yqui::NUM_SESSIONS.times do |i|
      using_session(:"s#{i}") { visit Yqui::YQUI_URL }
    end
  end
end
