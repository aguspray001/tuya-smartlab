module.exports = {
    up(queryInterface, Sequelize){
        return Promise.all([
            queryInterface.addColumn(
                'HistoryDevices',
                'message',
                {
                    type: Sequelize.STRING,
                    allowNull: true
                }
            ),
        ])
    },

    down(queryInterface, Sequelize) {
        // logic for reverting the changes
        return Promise.all([
          queryInterface.removeColumn('HistoryDevices', 'message'),
        ]);
    }
}