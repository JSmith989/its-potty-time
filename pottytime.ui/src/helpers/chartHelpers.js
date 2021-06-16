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
const fiveVeg = (act) => {
  const r = [];
  act.forEach((activity) => {
    if (activity.mealType === 0) {
      if (activity.rating === 5) {
        r.push(activity.rating);
      }
    }
  });
  return r.length;
};
const fourVeg = (act) => {
  const r = [];
  act.forEach((activity) => {
    if (activity.mealType === 0) {
      if (activity.rating === 4) {
        r.push(activity.rating);
      }
    }
  });
  return r.length;
};
const threeVeg = (act) => {
  const r = [];
  act.forEach((activity) => {
    if (activity.mealType === 0) {
      if (activity.rating === 3) {
        r.push(activity.rating);
      }
    }
  });
  return r.length;
};
const twoVeg = (act) => {
  const r = [];
  act.forEach((activity) => {
    if (activity.mealType === 0) {
      if (activity.rating === 2) {
        r.push(activity.rating);
      }
    }
  });
  return r.length;
};
const oneVeg = (act) => {
  const r = [];
  act.forEach((activity) => {
    if (activity.mealType === 0) {
      if (activity.rating === 1) {
        r.push(activity.rating);
      }
    }
  });
  return r.length;
};
const fiveFruit = (act) => {
  const r = [];
  act.forEach((activity) => {
    if (activity.mealType === 1) {
      if (activity.rating === 5) {
        r.push(activity.rating);
      }
    }
  });
  return r.length;
};
const fourFruit = (act) => {
  const r = [];
  act.forEach((activity) => {
    if (activity.mealType === 1) {
      if (activity.rating === 4) {
        r.push(activity.rating);
      }
    }
  });
  return r.length;
};
const threeFruit = (act) => {
  const r = [];
  act.forEach((activity) => {
    if (activity.mealType === 1) {
      if (activity.rating === 3) {
        r.push(activity.rating);
      }
    }
  });
  return r.length;
};
const twoFruit = (act) => {
  const r = [];
  act.forEach((activity) => {
    if (activity.mealType === 1) {
      if (activity.rating === 2) {
        r.push(activity.rating);
      }
    }
  });
  return r.length;
};
const oneFruit = (act) => {
  const r = [];
  act.forEach((activity) => {
    if (activity.mealType === 1) {
      if (activity.rating === 1) {
        r.push(activity.rating);
      }
    }
  });
  return r.length;
};
const fiveMeat = (act) => {
  const r = [];
  act.forEach((activity) => {
    if (activity.mealType === 2) {
      if (activity.rating === 5) {
        r.push(activity.rating);
      }
    }
  });
  return r.length;
};
const fourMeat = (act) => {
  const r = [];
  act.forEach((activity) => {
    if (activity.mealType === 2) {
      if (activity.rating === 4) {
        r.push(activity.rating);
      }
    }
  });
  return r.length;
};
const threeMeat = (act) => {
  const r = [];
  act.forEach((activity) => {
    if (activity.mealType === 2) {
      if (activity.rating === 3) {
        r.push(activity.rating);
      }
    }
  });
  return r.length;
};
const twoMeat = (act) => {
  const r = [];
  act.forEach((activity) => {
    if (activity.mealType === 2) {
      if (activity.rating === 2) {
        r.push(activity.rating);
      }
    }
  });
  return r.length;
};
const oneMeat = (act) => {
  const r = [];
  act.forEach((activity) => {
    if (activity.mealType === 2) {
      if (activity.rating === 1) {
        r.push(activity.rating);
      }
    }
  });
  return r.length;
};

export {
  veg, fruit, meat, fiveStar, fourStar, threeStar, twoStar, oneStar, noStar,
  fiveVeg, fourVeg, threeVeg, twoVeg, oneVeg, fiveFruit, fourFruit, threeFruit, twoFruit, oneFruit,
  fiveMeat, fourMeat, threeMeat, twoMeat, oneMeat,
};
