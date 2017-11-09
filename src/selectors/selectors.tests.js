import expect from 'expect';
import {authorsFormattedForDropdown} from './selectors';

describe('Author Selectors',()=>{
  describe('authorsFormattedForDropdown',()=>{
    it('should return author data formatted for use in a dropdown',()=>{
      const authors = [
        {id:'cory-house', firstName:'Cory', lastName:'House'},
          {id:'scott-allen', firstName:'Scott', lastName:'Allen'},
      ];

      const expected = [
        {id:'cory-house', text:'Cory House'},
        {id:'scott-allen', text:'Scott Allen'}
      ];
      expect(authorsFormattedForDropdown(authors)).toEqual(expected);
    });
  });
});
