import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {OptionType} from "../../../typescript"
const animatedComponents = makeAnimated();

export  function SelectInput({setMarket,data}:{setMarket:any;data:OptionType[]}) {
 

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={data}
      onChange={setMarket}
    />
  );
}