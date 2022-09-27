import { writable } from 'svelte/store';

const meetupsStore = writable([]);

const setMeetups = meetups => {
  meetupsStore.set(meetups);
};

const addMeetup = meetup => {
  meetupsStore.update(currentMeetups => {
    return [meetup, ...currentMeetups];
  });
};

const updateMeetup = (id, meetupData) => {
  meetupsStore.update(currentMeetups => {
    const meetupToUpdateIndex = currentMeetups.findIndex(
      meetup => meetup.id == id,
    );
    let meetupToUpdate = {
      ...currentMeetups[meetupToUpdateIndex],
      ...meetupData,
    };

    const cloneMeetups = [...currentMeetups];
    cloneMeetups[meetupToUpdateIndex] = meetupToUpdate;
    return cloneMeetups;
  });
};

const deleteMeetup = id => {
  meetupsStore.update(currentMeetups => {
    return currentMeetups.filter(meetup => meetup.id != id);
  });
};

const toggleFavorite = id => {
  meetupsStore.update(currentMeetups => {
    const meetupToUpdate = {
      ...currentMeetups.find(meetup => meetup.id == id),
    };
    meetupToUpdate.isFavorite = !meetupToUpdate.isFavorite;
    const meetupToUpdateIndex = currentMeetups.findIndex(
      meetup => meetup.id == id,
    );

    const cloneMeetups = [...currentMeetups];
    cloneMeetups[meetupToUpdateIndex] = meetupToUpdate;
    return cloneMeetups;
  });
};

const customMeetupsStore = {
  subscribe: meetupsStore.subscribe,
  setMeetups,
  addMeetup,
  updateMeetup,
  deleteMeetup,
  toggleFavorite,
};

export default customMeetupsStore;
