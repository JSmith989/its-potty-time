const veg = (act) => {
  const v = [];
  act.forEach((activity) => {
    if (activity.mealType === 0) {
      v.push(activity);
    }
  });
  return v;
};
const fruit = (act) => {
  const f = [];
  act.forEach((activity) => {
    if (activity.mealType === 1) {
      f.push(activity);
    }
  });
  return f;
};
const meat = (act) => {
  const m = [];
  act.forEach((activity) => {
    if (activity.mealType === 2) {
      m.push(activity);
    }
  });
  return m;
};
const fiveStar = (act) => {
  const r = [];
  if (act.activityType !== 0) {
    act.forEach((activity) => {
      if (activity.rating === 5) {
        r.push(activity.rating);
      }
    });
  }

  return r.length;
};
const fourStar = (act) => {
  const r = [];
  if (act.activityType !== 0) {
    act.forEach((activity) => {
      if (activity.rating === 4) {
        r.push(activity.rating);
      }
    });
  }

  return r.length;
};
const threeStar = (act) => {
  const r = [];
  if (act.activityType !== 0) {
    act.forEach((activity) => {
      if (activity.rating === 3) {
        r.push(activity.rating);
      }
    });
  }

  return r.length;
};
const twoStar = (act) => {
  const r = [];
  if (act.activityType !== 0) {
    act.forEach((activity) => {
      if (activity.rating === 2) {
        r.push(activity.rating);
      }
    });
  }

  return r.length;
};
const oneStar = (act) => {
  const r = [];
  if (act.activityType !== 0) {
    act.forEach((activity) => {
      if (activity.rating === 1) {
        r.push(activity.rating);
      }
    });
  }

  return r.length;
};
const noStar = (act) => {
  const r = [];
  if (act.activityType !== 0 && act.rating === null) {
    act.forEach((activity) => {
      if (activity.rating === 0) {
        r.push(activity.rating);
      }
    });
  }

  return r.length;
};

export {
  veg, fruit, meat, fiveStar, fourStar, threeStar, twoStar, oneStar, noStar
};
