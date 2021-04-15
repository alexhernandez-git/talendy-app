import ContributeLayout from "components/Pages/Contribute/ContributeLayout";
import React, { useEffect, useState } from "react";
import { Reacteroids } from "components/Reacteroids/Reacteroids";

const Asteroids = () => {
  const [canLoad, setCanLoad] = useState(false);
  useEffect(() => {
    setCanLoad(true);
  }, []);
  return (
    <ContributeLayout>
      <section aria-labelledby="notes-title" className=" sticky top-4">
        <div className="shadow sm:rounded-lg relative">
          {canLoad && <Reacteroids />}
        </div>
      </section>
    </ContributeLayout>
  );
};

export default Asteroids;
