import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define the initial state and type for the region
export enum Region {
  ALL = 'all',
  EU_CENTRAL_1 = 'eu-central-1',
  US_EAST_1 = 'us-east-1',
  US_WEST_1 = 'us-west-1',
  US_WEST_2 = 'us-west-2',
  AP_SOUTH_1 = 'ap-south-1',
  AP_NORTHEAST_1 = 'ap-northeast-1',
  AP_NORTHEAST_2 = 'ap-northeast-2',
  AP_SOUTHEAST_1 = 'ap-southeast-1',
  AP_SOUTHEAST_2 = 'ap-southeast-2',
  CA_CENTRAL_1 = 'ca-central-1',
  SA_EAST_1 = 'sa-east-1',
}

interface RegionState {
  region: Region;
}

const initialState: RegionState = {
  region: Region.ALL, // Default region
};

// Create a slice for the region
const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    setRegion(state, action: PayloadAction<Region>) {
      state.region = action.payload;
    },
  },
});

// Export the action to set the region
export const { setRegion } = regionSlice.actions;

// Create the store
const store = configureStore({
  reducer: {
    region: regionSlice.reducer,
  },
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

// Export the store
export default store;

// Create a typed version of the useDispatch hook
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

// Create a typed version of the useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
