module.exports = {
    up(queryInterface, Sequelize){
        return Promise.all([
            queryInterface.addColumn(
                'Users',
                'email',
                {
                    type: Sequelize.STRING,
                    allowNull: true
                }
            ),
            queryInterface.addColumn(
                'Users',
                'isVerified',
                {
                    type: Sequelize.BOOLEAN,
                    allowNull: true
                }
            )
        ])
    },

    down(queryInterface, Sequelize) {
        // logic for reverting the changes
        return Promise.all([
          queryInterface.removeColumn('Users', 'email'),
          queryInterface.removeColumn('Users', 'isVerified'),
        ]);
    }
}