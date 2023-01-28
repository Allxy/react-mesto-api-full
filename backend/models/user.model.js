import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www.)?[^\s]+(#?)$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid url`,
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(v) {
        return /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

}, {
  timestamps: true,
  versionKey: false,
});

export default model('user', userSchema);
