import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import axios from 'axios';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

const filter = createFilterOptions();

const CompareCarModel = ({ model, carId, excludeIds = [], isNavigationMode = false, onSelect, darkTheme = false }) => {
  const router = useRouter();
  const [carName, setCarName] = useState({ name: null, id: null });
  const [cardata, setCarData] = useState([]);
  const [error, setError] = useState([]);
  
  const carData = async () => {
    const response = await axios.get(`/api/getCar`);
    const data = response.data.map(car => ({
      ...car,
      model: car.model ? car.model.replace(/_/g, ' ') : car.model
    }));
    // If navigation mode, don't filter out anything. 
    // Otherwise, filter by excludeIds array if provided, fallback to single carId.
    const filterdata = isNavigationMode 
      ? data 
      : data.filter((item) => {
          if (excludeIds.length > 0) return !excludeIds.includes(item.id);
          return item.id !== carId;
        });

    setCarData(filterdata);
  };
  
  const redirectToComparisonPage = (currentCarId, targetCarId) => {
    if (isNavigationMode) {
      router.push(`/single-car/${targetCarId}`);
    } else {
      router.push(`/comparecar/${currentCarId}/${targetCarId}`);
    }
  };

  useEffect(() => {
    carData();

    if (carName.name === model) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
    if (carName.id && !(carName.name === model)) {
      if (onSelect) {
        onSelect(carName.id);
      } else {
        redirectToComparisonPage(carId, carName.id);
      }
    }
  }, [carName.id]);

  return (
    <>
      <Autocomplete
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '100px',
            color: darkTheme ? 'white' : 'inherit',
            backgroundColor: darkTheme ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
            backdropFilter: darkTheme ? 'blur(10px)' : 'none',
            paddingTop: { xs: '2px', lg: '4px' },
            paddingBottom: { xs: '2px', lg: '4px' },
          },
          '& .MuiOutlinedInput-input': {
            textAlign: darkTheme ? 'center' : 'left',
            fontSize: { xs: '12px', lg: '16px' },
            padding: '4px !important', // Override MUI default padding to ensure centering works
          },
          '& .MuiOutlinedInput-input::placeholder': {
            color: darkTheme ? 'rgba(255, 255, 255, 0.5)' : 'inherit',
            textAlign: darkTheme ? 'center' : 'left',
            opacity: 1,
          },
          '& .MuiInputLabel-root': {
            color: darkTheme ? 'rgba(255, 255, 255, 0.5)' : 'inherit',
            fontSize: '14px',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: darkTheme ? '#E11D48' : 'black',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: darkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.23)',
          },
          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: darkTheme ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.87)',
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E11D48',
          },
          '& .MuiSvgIcon-root': {
            color: darkTheme ? 'rgba(255, 255, 255, 0.5)' : 'inherit',
          },
          '& .MuiAutocomplete-clearIndicator': {
            display: darkTheme ? 'none' : 'inline-flex', // Hide clear icon in dark theme so text stays centered
          },
          '& .MuiAutocomplete-popupIndicator': {
            display: darkTheme ? 'none' : 'inline-flex', // Hide dropdown arrow in dark theme
          }
        }}
        slotProps={{
          paper: {
            sx: darkTheme ? {
              bgcolor: 'rgba(17, 17, 17, 0.95)',
              color: 'white',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              marginTop: '8px',
              '& .MuiAutocomplete-option[aria-selected="true"]': {
                bgcolor: 'rgba(225, 29, 72, 0.2)',
              },
              '& .MuiAutocomplete-option:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            } : {}
          }
        }}
        disablePortal
        value={carName.name}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue(newValue);
          } else if (newValue && newValue.inputValue) {
            setValue(newValue.inputValue);
          } else {
            setCarName({ name: newValue?.model, id: newValue?.id });
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;

          const isExisting = options.some(
            (option) => inputValue === option.model,
          );

          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <li key={props.id} {...optionProps}>
              {option.model}
            </li>
          );
        }}
        options={cardata}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          } else if (option.model && option.inputValue) {
            return option.inputValue;
          } else {
            return option.model;
          }
        }}
        renderInput={(params) => (
          <TextField 
            {...params} 
            placeholder={darkTheme ? "SWAP CAR..." : undefined}
            label={darkTheme ? undefined : (isNavigationMode ? "Search for a car" : "Swap Car...")} 
          />
        )}
        freeSolo
      />
    </>
  );
};
export default CompareCarModel;
