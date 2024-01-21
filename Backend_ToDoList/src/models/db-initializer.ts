import ToDoModel from './todo.model';
const { Sequelize, DataTypes } = require('sequelize');

export default class DbInitializer {
    
    public static Initial(): void {

        const sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
        });

        ToDoModel.init(
            {
                task: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                completed: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
                deleted: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
            },
            {
                sequelize,
                modelName: 'ToDo',
            }
        );
        sequelize.sync();
    }
}