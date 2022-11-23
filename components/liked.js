let h1 = document.getElementById("h1")

      fetch("/playlist/liked")
        .then((response) => response.json())
        .then((obj) => {
          obj.data.forEach((element) => {
            console.log(element);
          });
        });

