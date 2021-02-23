describe 'rooms' do
  example do
    windows.each do |window|
      within_window(window) do
        expect(page).to have_title 'Yqui'
      end
    end
  end
end
