import pika

url ='amqp://moggqonv:YSi2cX9QAgKzdawLMa2EPVb1-NB-VvRR@orangutan.rmq.cloudamqp.com/moggqonv'
params = pika.URLParameters(url)
connection = pika.BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue='hello')

def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)

channel.basic_consume(callback,
                      queue='hello',
                      no_ack=True)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()
