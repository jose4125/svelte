import { writable } from 'svelte/store';

const hobbies = writable([]);

const setHobbies = hobbiesData => {
  hobbies.set(hobbiesData);
};

const addHobby = hobby => {
  hobbies.update(currentHobbies => {
    return [hobby, ...currentHobbies];
  });
};

const hobbiesStore = {
  subscribe: hobbies.subscribe,
  setHobbies,
  addHobby,
};

export default hobbiesStore;
