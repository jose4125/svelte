import { writable } from 'svelte/store';

function createCart() {
  const cartStore = writable([
    {
      id: 'p10',
      title: 'Test',
      price: 9.99,
    },
    {
      id: 'p11',
      title: 'Test',
      price: 9.99,
    },
  ]);

  const addItem = item => {
    cartStore.update(currentItems => {
      return [...currentItems, item];
    });
  };

  const removeItem = itemId => {
    cartStore.update(currentItems => {
      return currentItems.filter(item => item.id !== itemId);
    });
  };

  return {
    subscribe: cartStore.subscribe,
    addItem,
    removeItem,
  };
}

export default createCart();
