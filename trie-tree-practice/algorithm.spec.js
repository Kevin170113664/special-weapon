const buildCascadeFromPlainObjectArray = (tableData, keys) => {
  const keyLength = keys.length;
  const hashTable = {};
  const result = [];
  for (let dataIndex = 0; dataIndex < tableData.length; dataIndex++) {
    let currentResult = result;
    let currentLayer = hashTable;
    for (let keyIndex = 0; keyIndex < keyLength; keyIndex++) {
      const notLeafKey = keyIndex !== keyLength - 1;
      const keyName = keys[keyIndex];
      const currentValue = tableData[dataIndex][keyName];
      const layerNotFound = !currentLayer[currentValue];

      if (layerNotFound) {
        const initLayer = {
          value: currentValue,
        };
        let children;
        if (notLeafKey) {
          children = [];
          initLayer.children = children
        }
        const layer = currentResult.push(initLayer) - 1;
        currentLayer[currentValue] = { layer };
        currentLayer = currentLayer[currentValue];
        currentResult = children
      } else {
        currentLayer = currentLayer[currentValue];
        currentResult = currentResult[currentLayer.layer].children
      }
    }
  }
  return result
};

it('trie tree practice', () => {
  const data = [
    {
      province: '浙江',
      city: '杭州',
      name: '西湖',
    },
    {
      province: '四川',
      city: '成都',
      name: '锦里',
    },
    {
      province: '四川',
      city: '成都',
      name: '方所',
    },
    {
      province: '四川',
      city: '阿坝',
      name: '九寨沟',
    },
  ];
  const keys = ['province', 'city', 'name'];

  const result = buildCascadeFromPlainObjectArray(data, keys);

  expect(result).toEqual([
    {
      value: '浙江',
      children: [
        {
          value: '杭州',
          children: [
            {
              value: '西湖',
            },
          ],
        },
      ],
    },
    {
      value: '四川',
      children: [
        {
          value: '成都',
          children: [
            {
              value: '锦里',
            },
            {
              value: '方所',
            },
          ],
        },
        {
          value: '阿坝',
          children: [
            {
              value: '九寨沟',
            },
          ],
        },
      ],
    },
  ])
});
