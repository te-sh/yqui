describe 'join' do
  example 'as player' do
    expect(page).to have_selector('.rooms-table tbody tr:first-child .num-users', text: '0')

    within_window(w1) { enter_room(1) }
    expect(page).to have_selector('.rooms-table tbody tr:first-child .num-users', text: '1')

    within_window(w2) { enter_room(2) }
    expect(page).to have_selector('.rooms-table tbody tr:first-child .num-users', text: '2')
  end

  example 'player box' do
    enter_room(0)

    expect(teams.size).to eq 1
    within(team0) do
      expect(players.size).to eq 1
      expect(player0).to have_selector('.player-name', text: 'ゆーた0')
    end

    within_window(w1) { enter_room(1) }

    expect(teams.size).to eq 1
    within(team0) do
      expect(players.size).to eq 2
      expect(player0).to have_selector('.player-name', text: 'ゆーた0')
      expect(player1).to have_selector('.player-name', text: 'ゆーた1')
    end

    within_window(w1) do
      expect(teams.size).to eq 1
      within(team0) do
        expect(players.size).to eq 2
        expect(player0).to have_selector('.player-name', text: 'ゆーた0')
        expect(player1).to have_selector('.player-name', text: 'ゆーた1')
      end
    end
  end

  example 'actions, subactions and chat message' do
    enter_room(0)

    expect(actions).to have_selector('.player-actions')
    expect(subactions).to have_selector('.player-subactions')
    expect(last_message).to have_selector('.message-body', text: 'ゆーた0さんが入室しました')

    within_window(w1) { enter_room(1) }

    expect(actions).to have_selector('.player-actions')
    expect(subactions).to have_selector('.player-subactions')
    expect(last_message).to have_selector('.message-body', text: 'ゆーた1さんが入室しました')

    within_window(w1) do
      expect(actions).to have_selector('.player-actions')
      expect(subactions).to have_selector('.player-subactions')
      expect(last_message).to have_selector('.message-body', text: 'ゆーた1さんが入室しました')
    end
  end
end
