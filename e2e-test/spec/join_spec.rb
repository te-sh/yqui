describe 'join' do
  example 'as player' do
    expect(page).to have_selector('.rooms-table tbody tr:first-child .num-users', text: '0')

    using_session(:s1) { enter_room }
    expect(page).to have_selector('.rooms-table tbody tr:first-child .num-users', text: '1')

    using_session(:s2) { enter_room }
    expect(page).to have_selector('.rooms-table tbody tr:first-child .num-users', text: '2')
  end

  example 'player box' do
    enter_room

    expect(teams.size).to eq 1
    within(team0) do
      expect(players.size).to eq 1
      expect(player0).to have_selector('.player-name', text: 'ゆーた0')
    end

    using_session(:s1) { enter_room }

    expect(teams.size).to eq 1
    within(team0) do
      expect(players.size).to eq 2
      expect(player0).to have_selector('.player-name', text: 'ゆーた0')
      expect(player1).to have_selector('.player-name', text: 'ゆーた1')
    end

    using_session(:s1) do
      expect(teams.size).to eq 1
      within(team0) do
        expect(players.size).to eq 2
        expect(player0).to have_selector('.player-name', text: 'ゆーた0')
        expect(player1).to have_selector('.player-name', text: 'ゆーた1')
      end
    end
  end

  example 'actions, subactions and chat message' do
    enter_room

    expect(actions).to have_selector('.player-actions')
    expect(subactions).to have_selector('.player-subactions')
    expect(last_message).to have_selector('.message-body', text: 'ゆーた0さんが入室しました')

    using_session(:s1) { enter_room }

    expect(actions).to have_selector('.player-actions')
    expect(subactions).to have_selector('.player-subactions')
    expect(last_message).to have_selector('.message-body', text: 'ゆーた1さんが入室しました')

    using_session(:s1) do
      expect(actions).to have_selector('.player-actions')
      expect(subactions).to have_selector('.player-subactions')
      expect(last_message).to have_selector('.message-body', text: 'ゆーた1さんが入室しました')
    end
  end
end
