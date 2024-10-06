const { LinkedList } = require("./linkedList.js");

function HashMap() {
  let size = 0;
  let loadFactor = 0.75;
  let capacity = 8;
  let buckArray = new Array(capacity).fill(null);

  function values() {
    let printArr = [];
    buckArray.forEach((item) => {
      if (item !== null) {
        let node = item.head;
        let linkedArr = [];
        while (node !== null) {
          linkedArr.push(node.value.value);

          node = node.nextNode;
        }
        printArr.push(linkedArr);
      }
    });
    return printArr;
  }

  function keys() {
    let printArr = [];
    buckArray.forEach((item) => {
      if (item !== null) {
        let node = item.head;
        let linkedArr = [];
        while (node !== null) {
          linkedArr.push(node.value.key);

          node = node.nextNode;
        }
        printArr.push(linkedArr);
      }
    });
    return printArr;
  }

  function clear() {
    capacity = 8;
    buckArray = new Array(capacity).fill(null);
    size = 0;
  }

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  function remove(key) {
    //need to remove the list as well
    let hashCode = hash(key);
    let list = buckArray[hashCode];
    if (list !== null) {
      let node = list.head;
      for (let i = 0; i < list.size; i++) {
        if (node.value.key === key) {
          list.removeAt(i);
          if (list.size === 0) {
            buckArray[hashCode] = null;
          }
          size -= 1;
          return true;
        }
        node = node.nextNode;
      }
    }
    return false;
  }
  function has(key) {
    let hashCode = hash(key);
    let list = buckArray[hashCode];
    if (list !== null) {
      //so that both invaild key and collision give error
      let node = list.head;
      while (node !== null) {
        if (node.value.key === key) {
          //check for proper key
          return true;
        }
        node = node.nextNode;
      }
    }
    return false;
  }

  function get(key) {
    //TODO: hash for linked list
    let hashCode = hash(key);
    let list = buckArray[hashCode];
    if (list !== null) {
      //so that both invaild key and collision give error
      let node = list.head;
      while (node !== null) {
        if (node.value.key === key) {
          //check for proper key
          return node.value.value;
        }
        node = node.nextNode;
      }
    }
    return null;
  }

  function expandBuckArray() {
    console.log("expanded")
    let pairs = entriesProper();
    capacity *= 2;
    buckArray = new Array(capacity).fill(null);
    size = 0;
    pairs.forEach((item) => {
      set(item[0], item[1]);
    });
    console.log(buckArray.length)
  }

  function set(key, value) {
    let hashCode = hash(key);
    if (size + 1 > capacity * loadFactor) {
      //size + 1 to factor in the element now being added
      expandBuckArray();
    }
    if (buckArray[hashCode] === null) {
      //adds into empty bucket
      const list = new LinkedList();
      list.append({ key, value });
      buckArray[hashCode] = list;
    } else {
      let node = buckArray[hashCode].head;
      while (node !== null) {
        if (node.value.key === key) {
          //changes value of same key
          node.value.value = value;
          return;
        }
        node = node.nextNode;
      }
      //appends on collision
      buckArray[hashCode].append({ key, value }); //TODO: hold it off for now to better hash it later
    }
    size += 1;
  }
  function entries() {
    let printArr = [];
    buckArray.forEach((item) => {
      if (item !== null) {
        let node = item.head;
        let linkedArr = [];
        while (node !== null) {
          linkedArr.push([node.value.key, node.value.value]);

          node = node.nextNode;
        }
        printArr.push(linkedArr);
      }
    });
    return printArr;
  }
  function entriesProper() {
    let printArr = [];
    buckArray.forEach((item) => {
      if (item !== null) {
        let node = item.head;
        while (node !== null) {
          printArr.push([node.value.key, node.value.value]);

          node = node.nextNode;
        }
      }
    });

    return printArr;
  }

  return {
    set,
    entries,
    get,
    has,
    remove,
    get size() {
      return size;
    },
    clear,
    keys,
    values,
    entriesProper
  };
}

let hash = HashMap();
hash.set("sup")
console.log(hash.entries())