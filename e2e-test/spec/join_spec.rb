describe 'join' do
  example 'as player' do
    expect(find('.rooms-table tbody tr:first-child .num-users')).to have_text('0')

    within_window(w1) { enter_room(1) }
    expect(find('.rooms-table tbody tr:first-child .num-users')).to have_text('1')

    within_window(w2) { enter_room(2) }
    expect(find('.rooms-table tbody tr:first-child .num-users')).to have_text('2')
  end

  example 'player box' do
    enter_room(0)

    teams = all('.room .team')
    expect(teams.size).to eq 1
    within(teams[0]) do
      players = all('.player')
      expect(players.size).to eq 1
      expect(players[0].find('.player-name')).to have_text('ゆーた0')
    end

    within_window(w1) { enter_room(1) }

    teams = all('.room .team')
    expect(teams.size).to eq 1
    within(teams[0]) do
      players = all('.player')
      expect(players.size).to eq 2
      expect(players[0].find('.player-name')).to have_text('ゆーた0')
      expect(players[1].find('.player-name')).to have_text('ゆーた1')
    end
  end
end
