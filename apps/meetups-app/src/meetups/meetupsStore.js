import { writable } from 'svelte/store';

const meetupsStore = writable([
  {
    id: 'm1',
    title: 'Coding Bootcamp',
    subtitle: 'Learn to code in 2 hours',
    description:
      'In this meetup, we will have some experts that teach you how to code!',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoq8HE0ZJdLBvIy6V761WQKslGTi4LdYfN5g&usqp=CAU',
    address: '27th Nerd Road, 32523 New York',
    contactEmail: 'jose@example.com',
    isFavorite: false,
  },
  {
    id: 'm2',
    title: 'Swim Together',
    subtitle: "Let's go for some swimming",
    description: 'We will simple swim some rounds!',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-_AdZE0pBDcKw4yCX2jC9b-45kyU6MSyh5Q&usqp=CAU',
    address: '27th Nerd Road, 32523 New York',
    contactEmail: 'swim@example.com',
    isFavorite: false,
  },
]);

const addMeetup = ({
  title,
  subtitle,
  address,
  imageUrl,
  contactEmail,
  description,
}) => {
  const newMeetup = {
    id: Date.now().toString(),
    title,
    subtitle,
    address,
    imageUrl,
    contactEmail,
    description,
    isFavorite: false,
  };

  meetupsStore.update(currentMeetups => {
    return [newMeetup, ...currentMeetups];
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
  addMeetup,
  updateMeetup,
  deleteMeetup,
  toggleFavorite,
};

export default customMeetupsStore;
