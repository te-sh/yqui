describe 'join' do
  describe 'as player' do
    example 'rooms' do
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

    example 'topbar buttons' do
      enter_room

      expect(topbar).to have_button('.begin-assign-button', disabled: true)
      expect(topbar).to have_button('.open-rule-button', disabled: true)
      expect(topbar).to have_button('.toggle-master-button', disabled: false, class: 'MuiIconButton-colorInherit')
      expect(topbar).to have_button('.toggle-observer-button', disabled: false, class: 'MuiIconButton-colorInherit')

      using_session(:s1) { enter_room }

      expect(topbar).to have_button('.begin-assign-button', disabled: true)
      expect(topbar).to have_button('.open-rule-button', disabled: true)
      expect(topbar).to have_button('.toggle-master-button', disabled: false, class: 'MuiIconButton-colorInherit')
      expect(topbar).to have_button('.toggle-observer-button', disabled: false, class: 'MuiIconButton-colorInherit')

      using_session(:s1) do
        expect(topbar).to have_button('.begin-assign-button', disabled: true)
        expect(topbar).to have_button('.open-rule-button', disabled: true)
        expect(topbar).to have_button('.toggle-master-button', disabled: false, class: 'MuiIconButton-colorInherit')
        expect(topbar).to have_button('.toggle-observer-button', disabled: false, class: 'MuiIconButton-colorInherit')
      end
    end
  end

  describe 'as observer' do
    example 'rooms' do
      expect(page).to have_selector('.rooms-table tbody tr:first-child .num-users', text: '0')

      using_session(:s1) { enter_room }
      expect(page).to have_selector('.rooms-table tbody tr:first-child .num-users', text: '1')

      using_session(:s2) { enter_room(observer: true) }
      expect(page).to have_selector('.rooms-table tbody tr:first-child .num-users', text: '2')
    end

    example 'player box' do
      enter_room

      expect(teams.size).to eq 1
      within(team0) do
        expect(players.size).to eq 1
        expect(player0).to have_selector('.player-name', text: 'ゆーた0')
      end

      using_session(:s1) { enter_room(observer: true) }

      expect(teams.size).to eq 1
      within(team0) do
        expect(players.size).to eq 1
        expect(player0).to have_selector('.player-name', text: 'ゆーた0')
      end

      using_session(:s1) do
        expect(teams.size).to eq 1
        within(team0) do
          expect(players.size).to eq 1
          expect(player0).to have_selector('.player-name', text: 'ゆーた0')
        end
      end
    end

    example 'actions, subactions and chat message' do
      enter_room

      expect(actions).to have_selector('.player-actions')
      expect(subactions).to have_selector('.player-subactions')
      expect(last_message).to have_selector('.message-body', text: 'ゆーた0さんが入室しました')

      using_session(:s1) { enter_room(observer: true) }

      expect(actions).to have_selector('.player-actions')
      expect(subactions).to have_selector('.player-subactions')
      expect(last_message).to have_selector('.message-body', text: 'ゆーた1さん (観戦) が入室しました')

      using_session(:s1) do
        expect(actions).to have_selector('.observer-actions')
        expect(subactions).to have_selector('.player-subactions')
        expect(last_message).to have_selector('.message-body', text: 'ゆーた1さん (観戦) が入室しました')
      end
    end

    example 'topbar buttons' do
      enter_room

      expect(topbar).to have_button('.begin-assign-button', disabled: true)
      expect(topbar).to have_button('.open-rule-button', disabled: true)
      expect(topbar).to have_button('.toggle-master-button', disabled: false, class: 'MuiIconButton-colorInherit')
      expect(topbar).to have_button('.toggle-observer-button', disabled: false, class: 'MuiIconButton-colorInherit')

      using_session(:s1) { enter_room(observer: true) }

      expect(topbar).to have_button('.begin-assign-button', disabled: true)
      expect(topbar).to have_button('.open-rule-button', disabled: true)
      expect(topbar).to have_button('.toggle-master-button', disabled: false, class: 'MuiIconButton-colorInherit')
      expect(topbar).to have_button('.toggle-observer-button', disabled: false, class: 'MuiIconButton-colorInherit')

      using_session(:s1) do
        expect(topbar).to have_button('.begin-assign-button', disabled: true)
        expect(topbar).to have_button('.open-rule-button', disabled: true)
        expect(topbar).to have_button('.toggle-master-button', disabled: true)
        expect(topbar).to have_button('.toggle-observer-button', disabled: false, class: 'MuiIconButton-colorSecondary')
      end
    end
  end
end
