const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            trim: true,
            max_length: 50,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v){
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v)
                },
                message: props => `${props.value} is not a valid email!`
            },
            required: [true, "User email required."]
        },
        thoughts: [{ 
            type: Schema.Types.ObjectId,
            ref: "thought"
        }],

        friends: [{ 
            type: Schema.Types.ObjectId,
            ref: "user"
        }],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        }
    }
);

userSchema.virtual("friendCount")

.get(function(){
    return this.friends.length
});

const User = model("user", userSchema);

module.exports = User;