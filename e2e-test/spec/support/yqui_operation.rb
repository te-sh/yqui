module YquiOperation
  include Capybara::DSL

  YQUI_URL = 'http://ec2-13-115-155-138.ap-northeast-1.compute.amazonaws.com:8085/'
  NUM_WINDOWS = 5
  WAIT_INTERVAL = 0.1

  NUM_WINDOWS.times do |index|
    define_method("w#{index}") do
      windows[index]
    end
  end

  def wait
    sleep WAIT_INTERVAL
  end

  def enter_room(index, name: "ゆーた#{index}", room: 1)
    find(".rooms-table tbody tr:nth-child(#{room}) .enter-room-button button").click
    find('.enter-room-dialog .enter-room .name input').set(name)
    find('.enter-room-dialog .submit').click
    wait
  end
end
