import { Model } from 'sequelize';

class ToDoModel extends Model {
    public id!: number;
    public task!: string;
    public completed!: boolean;
    public deleted!: boolean;
}

export default ToDoModel