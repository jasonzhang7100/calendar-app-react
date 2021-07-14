// 把useEffect中的回调函数单独打包出来使用，除了结构清晰，也避免了effect中传参放里面还是外面的waring问题
const buildCalendar = (value) => {
  // 为什么用clone，因为moment的对象是mutational的，操作的时候时间值会一直变，所以采用clone方法来固定
  const startDay = value.clone().startOf('month').startOf('week');
  const endDay = value.clone().endOf('month').endOf('week');
  const day = startDay.clone().subtract(1, 'day');
  // 用temp来装matrix日期表，然后set方法给calendar赋值，不直接操作calendar这个getter，而应该使用setter
  const calendar = [];
  while (day.isBefore(endDay, 'day')) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, 'day').clone()),
    );
  }
  return calendar;
};

export default buildCalendar;
