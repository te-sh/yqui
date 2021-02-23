shared_context 'global context' do
  let(:yqui_url) { 'http://ec2-13-115-155-138.ap-northeast-1.compute.amazonaws.com:8085/' }
  let(:num_windows) { 5 }

  let(:w0) { windows[0] }
  let(:w1) { windows[1] }
end
