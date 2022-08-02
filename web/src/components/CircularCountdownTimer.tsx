import { createSignal, onMount } from 'solid-js';

export function CircularCountdownTimer(props: { time: number }) {
  const [count, setCount] = createSignal(props.time);
  const [dashOffset, setDashOffset] = createSignal(0);

  const decrement = () => {
    if (count() >= 0) {
      setDashOffset((360 / props.time) * (props.time - count()));
      setCount(count() - 1);
      setTimeout(decrement, 1000);
    }
  };
  onMount(() => {
    decrement();
  });

  return (
    <div class="timer">
      <h2>{count() + 1}</h2>
      <svg viewBox="0 0 122.6 122.6" xmlns="http://www.w3.org/2000/svg">
        <circle
          id="circle"
          class="circle_animation1"
          r="57.3"
          cy="61.3"
          cx="61.3"
          stroke-width="4"
          stroke="#fff"
          fill="none"
        />
      </svg>
      <svg viewBox="0 0 122.6 122.6" xmlns="http://www.w3.org/2000/svg">
        <circle
          id="circle"
          class="circle_animation"
          r="57.3"
          cy="61.3"
          cx="61.3"
          stroke-width="4"
          stroke-dashoffset={dashOffset()}
          stroke="#6fdb6f"
          fill="none"
        />
      </svg>
    </div>
  );
}
