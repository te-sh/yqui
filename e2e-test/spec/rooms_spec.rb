describe 'rooms' do
  before do
    visit 'http://ec2-13-115-155-138.ap-northeast-1.compute.amazonaws.com:8085/'
  end

  it { expect(page).to have_title 'Yqui' }
end
