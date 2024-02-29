'use client'

import React from "react";
import {Input} from "antd";
import debounce from "@/services/useDebounce";
import {useAppDispatch, useAppSelector} from "@/stores/hooks";
import {
  clearPlaceAutocomplete,
  fetchPlaceAutocomplete,
  onSelectPlaceAutocomplete,
  toggleDropdownPlaceAutocomplete,
} from "@/epics/placeAutocompleteEpic";
import {HistoryOutlined} from "@ant-design/icons";
import "../../../../../styles/select.scss";
import {PlaceAutocomplete} from "@/reducers/placeAutocompleteSlice";

const {Search} = Input;

const Autocomplete = () => {
  // Initialize useAppDispatch to dispatch redux actions.
  const dispatch = useAppDispatch();

  // Select data from the Redux store using useSelector.
  const {
          isShowDropdown,
          isFetching,
          list,
          selected,
        } = useAppSelector((state) => state.placeAutocomplete);

  return (
    <div>
      <Search
        placeholder = "Start typing your place name..."
        size = "large"
        loading = {isFetching}
        allowClear
        onFocus = {() => dispatch(toggleDropdownPlaceAutocomplete(true))}
        onBlur = {debounce(() => dispatch(toggleDropdownPlaceAutocomplete(false)), 100)}
        onChange = {
          debounce((e: {target: {value: any;};}) => {
            const string: string = e.target.value.trim();

            if (string.length >= 2) {
              // Prevent if length is less then 2 char.
              return dispatch(fetchPlaceAutocomplete(string));

            } else if (string.length === 0) {
              // onClear handler to clear list.
              return dispatch(clearPlaceAutocomplete());
            }
          })
        }
      />

      {
        (isShowDropdown && list.length > 0) &&
        <div className = "searchDropdown">
          {list.map((item: PlaceAutocomplete, index: number) => (
            <div
              key = {index}
              className = "item"
              onClick = {() => dispatch(onSelectPlaceAutocomplete(item))}
            >
              <div className = "title">{item.title}</div>

              {item.isPastSearch && <HistoryOutlined/>}
            </div>
          ))}
        </div>
      }

      <br/>
      <br/>
      <div style = {{textAlign: "center"}}>Current address: {selected.title}</div>

    </div>
  );
}

export default Autocomplete;
