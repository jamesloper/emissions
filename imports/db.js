import { Mongo } from 'meteor/mongo';

export const SmartAccounts = new Mongo.Collection('SmartAccounts');
export const SmartDevices = new Mongo.Collection('SmartDevices');
export const PhoneLog = new Mongo.Collection('PhoneLog');
export const Events = new Mongo.Collection('Events');
