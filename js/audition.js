<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>无标题文档</title>
</head>

<style>
	
.pause {
            height: 50px;
            background: url(img/musicbtn.png) no-repeat;
            display: block;
            background-position: 0 bottom;
        }
 
        .play {
            height: 50px;
            background: url(img/musicbtn.png) no-repeat;
            display: block;
        }

	</style>
	<script language="javascript">
		function autoPlay() {
            var myAuto = document.getElementById('bgMusic');
            var btn = document.getElementById('audioBtn');
            if (myAuto.paused) {
                myAuto.play();
                btn.classList.remove("pause");
                btn.classList.add("play");
            } else {
                myAuto.pause();
 
                btn.classList.remove("play");
                btn.classList.add("pause");
            }
 
        }
	</script>
<body>
<audio id="bgMusic" src="https://m10.music.126.net/20190106182444/5e48375c7a65181b02dc302ab7f29fb9/ymusic/9c4e/bcf3/980c/23d07aef9c9827cace2f05d981a91105.mp3" autoplay preload loop></audio>
<a class="play" id="audioBtn" style="cursor:pointer;" onclick="autoPlay()"></a>
                    <audio id="bgMusic" src="https://m10.music.126.net/20190106173610/bc2414d270e64308ed145f7177585f9e/ymusic/9c4e/bcf3/980c/23d07aef9c9827cace2f05d981a91105.mp3" autoplay preload loop></audio>

</body>
</html>
