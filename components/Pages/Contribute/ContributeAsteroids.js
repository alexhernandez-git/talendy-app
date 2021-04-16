import React, { useEffect, useState } from "react";
import { Reacteroids } from "components/Reacteroids/Reacteroids";

const ContributeAsteroids = () => {
  const [canLoad, setCanLoad] = useState(false);
  useEffect(() => {
    setCanLoad(true);
  }, []);
  return (
    <section aria-labelledby="notes-title" className=" sticky top-4">
      <div className="shadow sm:rounded-lg relative">
        {canLoad && <Reacteroids />}
      </div>
    </section>
  );
};

export default ContributeAsteroids;
