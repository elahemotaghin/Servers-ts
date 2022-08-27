import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions<TagOptionType>();

type props = {
  setNewTag: any,
}

export default function CreateNewTag({setNewTag}:props) {
  const [value, setValue] = React.useState<TagOptionType|null>(null);
  return (
    <Autocomplete
      value={value}
      onChange={(event:any, newValue:any) => {
        if (typeof newValue === 'string') {
          setValue({
            name: newValue,
          });
          allTags.push({name: newValue});
          setNewTag(newValue);
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            name: newValue.inputValue,
          });
        } else {
            setValue(newValue);
            if(newValue!=null){
                setNewTag(newValue.name);
            }
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={allTags}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      sx={{ width: 200, marginLeft:2}}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} placeholder="نام تگ مورد نظر را وارد کنید." />
      )}
    />
  );
}

interface TagOptionType {
  inputValue?: string;
  name: string;
}
const allTags: TagOptionType[] = [
    {name:'اشتراکی'},
    {name: 'ابری'},
    {name: 'اختصاصی'}
]
