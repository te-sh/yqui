describe 'rooms' do
  example do
    Yqui::NUM_SESSIONS.times do |i|
      using_session(:"s#{i}") do
        expect(page).to have_title 'Yqui'
      end
    end
  end
end
