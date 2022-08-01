import { createEffect, createSignal } from 'solid-js';

export function Timer() {
  const [count, setCount] = createSignal(10);

  const decrement = () => {
    setCount(count() - 1);
    if (count() > 0) {
      setTimeout(decrement, 1000);
    }
  };

  decrement();

  createEffect(() => {
    console.log(count());
  });

  return (
    <div class="circle">
      <div class="circle_bg" style={{ opacity: count() / 10 }}></div>
      <div class="circle_center">
        <p>{count()}</p>
      </div>
    </div>
  );
}
