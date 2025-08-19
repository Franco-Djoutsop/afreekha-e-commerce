import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class Timer extends Model{
    public idTimer!: number;
    public status!: boolean;
    public collection!: String;
}

Timer.init(
    {
        idTimer:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        status:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        collection:{
            type:DataTypes.STRING,
            allowNull: true
        }
    },{
        sequelize,
        modelName:"Timer",
        tableName:"timer"
    }
);

export default Timer;