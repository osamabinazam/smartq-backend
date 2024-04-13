// Import necessary modules and dependencies
import { Sequelize } from 'sequelize';
import UserModel from './UserModel';

// Initialize a Sequelize instance for testing
const sequelize = new Sequelize('sqlite::memory:');

// Initialize the User model for testing
const User = UserModel(sequelize);

// Test suite for the User model
describe('UserModel', () => {
  // Test case to ensure the model is defined correctly
  it('should define the User model', () => {
    expect(User).toBeDefined();
    expect(User === sequelize.models.User).toBe(true);
  });

  // Test case to ensure model fields are defined correctly
  it('should define the correct fields', () => {
    const attributes = User.rawAttributes;
    expect(attributes.userid.type.key).toBe('UUID');
    expect(attributes.username.type.key).toBe('STRING');
    expect(attributes.email.type.key).toBe('STRING');
    expect(attributes.gender.type.key).toBe('ENUM');
    expect(attributes.password.type.key).toBe('STRING');
    expect(attributes.lastlogin.type.key).toBe('DATE');
    expect(attributes.usertype.type.key).toBe('ENUM');
    expect(attributes.isactive.type.key).toBe('BOOLEAN');
  });

  // Test case to ensure model options are defined correctly
  it('should define the correct options', () => {
    expect(User.tableName).toBe('users');
  });

  // You can write more test cases to test model validations, instance methods, etc.
});
