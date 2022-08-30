import React, { useState } from 'react';

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
 
<div class="accordion accordion-flush bg-gradient-to-r p-[1px] from-indigo-500 via-purple-500 to-pink-500  mb-5" id="accordionFlushExample">
  <div class="accordion-item " onClick={() => setIsActive(!isActive)}>
    <div class="flex flex-row">
    <h2 class="font-RobotoMono w-11/12 accordion-header mb-0" id="flush-headingOne">
      <button class="
    relative
    flex
    items-center
    w-full
    py-4
    px-5
    text-base text-gray-800 text-left
    bg-white
    dark:text-white
    dark:bg-hotstar
    transition
    focus:outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
        aria-expanded="false" aria-controls="flush-collapseOne">
        {title}
      </button>
    </h2>
    <div class="w-1/6 flex bg-hotstar  justify-center items-center text-2xl">{isActive ? '-' : '+'}</div>
    
    </div>
    {isActive && 
    <div id="flush-collapseOne" class="dark:text-white dark:bg-hotstar accordion-collapse border-0 collapse show"
      aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="font-RobotoMono accordion-body py-4 px-5"> {content}</div>
    </div> }
  </div>
</div>
  );
};

export default Accordion;


