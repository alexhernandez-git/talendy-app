import ContributeLayout from "components/pages/Contribute/ContributeLayout";
import React, { useEffect, useState } from "react";
import { Reacteroids } from "components/Reacteroids/Reacteroids";
import SharedEditor from "components/Editor/SharedEditor";
import QuillEditor from "components/Editor/QuillEditor";
const SharedNotes = () => {
  return (
    <ContributeLayout>
      <section aria-labelledby="notes-title" className=" sticky top-4">
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 dark:bg-gray-700 shadow sm:rounded-lg p-1">
          {/* <SharedEditor /> */}
          <QuillEditor />
        </div>
      </section>
    </ContributeLayout>
  );
};

export default SharedNotes;
