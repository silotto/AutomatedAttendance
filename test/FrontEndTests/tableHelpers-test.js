import React from 'react';
import keydown, { Keys } from 'react-keydown';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import tableHelpers from '../../src/public/helpers/tableHelpers';

describe('<tableHelpers />', function() {

  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    const resolved = new Promise((res) => res({ data: [{ type: 'admin' }] }));
    sandbox.stub(axios, 'get').returns(resolved);
    sandbox.stub(axios, 'post').returns(resolved);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should convert month from number to string', () => {
    expect(tableHelpers.months[0]).to.equal('January');
    expect(tableHelpers.months[1]).to.equal('February');
    expect(tableHelpers.months[2]).to.equal('March');
    expect(tableHelpers.months[3]).to.equal('April');
    expect(tableHelpers.months[4]).to.equal('May');
    expect(tableHelpers.months[5]).to.equal('June');
    expect(tableHelpers.months[6]).to.equal('July');
    expect(tableHelpers.months[7]).to.equal('August');
    expect(tableHelpers.months[8]).to.equal('September');
    expect(tableHelpers.months[9]).to.equal('October');
    expect(tableHelpers.months[10]).to.equal('November');
    expect(tableHelpers.months[11]).to.equal('December');
  });
  
  it('should convert day from number to string', () => {
    expect(tableHelpers.days[0]).to.equal('Sunday');
    expect(tableHelpers.days[1]).to.equal('Monday');
    expect(tableHelpers.days[2]).to.equal('Tuesday');
    expect(tableHelpers.days[3]).to.equal('Wednesday');
    expect(tableHelpers.days[4]).to.equal('Thursday');
    expect(tableHelpers.days[5]).to.equal('Friday');
    expect(tableHelpers.days[6]).to.equal('Saturday');
  });
  
  it('should format date to string', () => {
    const date = tableHelpers.dateFormatter('2017-04-12 04:21:36');
    expect(date).to.equal('Wednesday, April 12, 2017');
  });
  
  it('should format cutoff time to string', () => {
    const time = tableHelpers.cutoffTimeFormatter('2017-04-12 04:21:36');
    expect(time).to.equal('4:21');
  });
  
  it('should format checkin time to string', () => {
    const time = tableHelpers.checkinTimeFormatter('2017-04-12 04:21:36');
    expect(time).to.equal('4:21:36');
  });
  
  it('should format time string with padding zeros', () => {
    const time = tableHelpers.checkinTimeFormatter('2017-04-12 04:01:06');
    expect(time).to.equal('4:01:06');
  });

  it('should return an empty string if provided with NULL cutoff date', () => {
    const time = tableHelpers.cutoffTimeFormatter(null);
    expect(time).to.equal('');
  });

  it('should return an empty string if provided with NULL checkin date', () => {
    const time = tableHelpers.checkinTimeFormatter(null);
    expect(time).to.equal('');
  });

  it('should sort full names by last name in descending order', () => {
    const names = tableHelpers.nameSort(
      {'first_name': 'Andrew', 'last_name': 'Brown'},
      {'first_name': 'Andrew', 'last_name': 'Alonis'},
      'desc'
    );
    expect(names).to.equal(-1);
  });
  
  it('should sort full names by first name in descending order', () => {
    const names = tableHelpers.nameSort(
      {'first_name': 'Bobby', 'last_name': 'Alonis'},
      {'first_name': 'Andrew', 'last_name': 'Alonis'},
      'desc'
    );
    expect(names).to.equal(-1);
  });

  it('should sort full names by last name in ascending order', () => {
    const names = tableHelpers.nameSort(
      {'first_name': 'Andrew', 'last_name': 'Brown'},
      {'first_name': 'Andrew', 'last_name': 'Alonis'},
      'asc'
    );
    expect(names).to.equal(1);
  });
  
  it('should sort full names by first name in ascending order', () => {
    var names = tableHelpers.nameSort(
      {'first_name': 'Bobby', 'last_name': 'Alonis'},
      {'first_name': 'Andrew', 'last_name': 'Alonis'},
      'asc'
    );
    expect(names).to.equal(1);
  });

  it('should extract first and last name from student property', () => {
    var names = tableHelpers.nameSort(
      {'student': 'Andrew Brown'},
      {'student': 'Andrew Alonis'},
      'asc'
    );
    expect(names).to.equal(1);
  });
  
  it('should extract first and last name from student property when only one name', () => {
    var names = tableHelpers.nameSort(
      {'student': 'Andrew'},
      {'student': 'Bobby'},
      'asc'
    );
    expect(names).to.equal(-1);
  });
  
  it('should pad numbers with zeros to specified width', () => {
    const num = tableHelpers.zeroFill(123, 5);
    expect(num).to.equal('00123');
  });

  it('should pad decimal numbers with zeros to specified width', () => {
    var num = tableHelpers.zeroFill(1.23, 5);
    expect(num).to.equal('001.23');
  });

  it('should return unmodified number as a string if provided with no width or width <= 0', () => {
    let num = tableHelpers.zeroFill(123);
    expect(num).to.equal('123');
    num = tableHelpers.zeroFill(123, -1);
    expect(num).to.equal('123');
  });
});
