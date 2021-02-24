module Yqui
  include Capybara::DSL

  YQUI_URL = 'http://ec2-13-115-155-138.ap-northeast-1.compute.amazonaws.com:8085/'
  NUM_SESSIONS = 5
  WAIT_INTERVAL = 0.1
  USER_NAME_PREFIX = 'ゆーた'

  def wait
    sleep WAIT_INTERVAL
  end

  def teams = all('.room .team')
  def team0 = teams[0]

  def players = all('.player')
  def player0 = players[0]
  def player1 = players[1]

  def actions = find('.room .actions')
  def subactions = find('.room .subactions')

  def last_message = find('.messages .message:last-child')

  def enter_room(room: 1, name: nil)
    name ||= USER_NAME_PREFIX + /(\d+)\z/.match(Capybara.session_name.to_s).to_a[1]
    find(".rooms-table tbody tr:nth-child(#{room}) .enter-room-button button").click
    find('.enter-room-dialog .enter-room .name input').set(name)
    find('.enter-room-dialog .submit').click
    wait
  end
end
