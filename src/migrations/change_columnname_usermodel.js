module.exports = {
    up(queryInterface, Sequelize){
        return Promise.all([
            queryInterface.renameColumn(
                'Users',
                'isVerified',
                'is_verified'
            ),
        ])
    },

    down(queryInterface, Sequelize){
        // 
    }
}