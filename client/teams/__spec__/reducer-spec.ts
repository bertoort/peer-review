/// <reference path="./../../../node_modules/@types/mocha/index.d.ts" />

import { expect } from 'chai';

import reducer from '../reducer';
import { Team } from '../model';

import {
  ADD_TEAM,
  DELETE_TEAM,
  EDIT_TEAM
} from '../actions';

// describe('reducer', () => {
//   it('handles add', () => {
//     let state: Team[] = [{ id: "0", name: ''}];
//
//     state = reducer(state, {
//       type: ADD_TEAM,
//       payload: { name: 'hello'}
//     });
//
//     expect(state[0].name).to.eql('hello');
//   });
//
//   it('handles delete', () => {
//     let state: Team[] = [{ id: "1", name: ''}];
//
//     state = reducer(state, {
//       type: DELETE_TEAM,
//       payload: { id: "1" } as Team
//     });
//
//     expect(state).to.eql([]);
//   });
//
//   it('handles edit', () => {
//     let state: Team[] = [{ id: "1", name: '' }];
//
//     state = reducer(state, {
//       type: EDIT_TEAM,
//       payload: { id: "1", name: 'hello' } as Team
//     });
//
//     expect(state[0].name).to.eql('hello');
//   });
//
// });
